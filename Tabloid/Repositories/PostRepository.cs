using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime,
                                p.IsApproved, p.CategoryId, p.UserProfileId,
                                c.Name as CategoryName,
                                up.DisplayName
                        FROM Post p
                        LEFT JOIN Category c on c.Id = p.CategoryId
                        LEFT JOIN UserProfile up on up.Id = p.UserProfileId
                        WHERE p.IsApproved = 1 AND p.PublishDateTime < SYSDATETIME()
                        ORDER BY p.CreateDateTime DESC";

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(NewPostFromDb(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime,
                           p.IsApproved, p.CategoryId, p.UserProfileId,
                           c.Name AS CategoryName,
                           up.DisplayName, com.Id AS CommentId,
                           com.PostId AS CommentPostId, com.UserProfileId AS CommentUserProfileId, 
                           com.Subject, com.Content AS CommentContent, com.CreateDateTime AS CommentCreateDateTime,
                           usp.DisplayName AS CommentUserProfileDisplayName        
                    FROM Post p
                    LEFT JOIN Category c on c.Id = p.CategoryId
                    LEFT JOIN UserProfile up on up.Id = p.UserProfileId
                    LEFT JOIN Comment com on com.PostId = p.Id
                    LEFT JOIN UserProfile usp on usp.Id = com.UserProfileId
                    WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    while (reader.Read())
                    {
                        if (post == null)
                        {
                            post = NewPostFromDb(reader);
                            post.Comments = new List<Comment>();
                        }
                        if (DbUtils.IsNotDbNull(reader, "CommentId"))
                        {
                            post.Comments.Add(new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "CommentId"),
                                PostId = id,
                                UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                Subject = DbUtils.GetString(reader, "Subject"),
                                Content = DbUtils.GetString(reader, "CommentContent"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CommentCreateDateTime"),
                                UserProfile = new UserProfile()
                                {
                                    DisplayName = DbUtils.GetString(reader, "CommentUserProfileDisplayName")
                                }
                            });
                        }
                    }

                    reader.Close();

                    return post;
                }

            }
        }

        public List<Post> GetPostByUserProfileId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime,
                           p.IsApproved, p.CategoryId, p.UserProfileId,
                           c.Name AS CategoryName,
                           up.DisplayName       
                    FROM Post p
                    LEFT JOIN Category c on c.Id = p.CategoryId
                    LEFT JOIN UserProfile up on up.Id = p.UserProfileId
                    WHERE p.UserProfileId = @Id
                    ORDER BY p.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", userProfileId);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(NewPostFromDb(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        // Need to update the PublishedDateTime and isApproved when we start the admin approval ticket.
        public void AddPost(Post post)
        {
            using(var conn = Connection) 
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (Title, Content, ImageLocation, CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime, @IsApproved, @CategoryId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdatePost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post 
                           SET Title = @Title,
                               Content = @Content,
                               ImageLocation = @ImageLocation,
                               PublishDateTime = @PublishDateTime,
                               CategoryId = @CategoryId,
                               UserProfileId = @UserProfileId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeletePost(int postId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Post SET IsDeleted=@IsDeleted WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@IsDeleted", 1);
                    cmd.Parameters.AddWithValue("@Id", postId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public List<Post> GetAllUserPosts(string FirebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved, 
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE PublishDateTime < SYSDATETIME() AND u.FirebaseUserId = @FirebaseUserId
                        ORDER BY PublishDateTime DESC";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", FirebaseUserId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromDb(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        private Post NewPostFromDb(SqlDataReader reader)
        {
            return new Post()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Content = DbUtils.GetString(reader, "Content"),
                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                },
                Category = new Category()
                {
                    Name = DbUtils.GetString(reader, "CategoryName")
                }
            };
        }


    }
}
/*                                       _.--^^^--,
                                    .'          `\
  .-^^^^^^-.                      .'              |
 /          '.                   /            .-._/
|             `.                |             |
 \              \          .-._ |          _   \
  `^^'-.         \_.-.     \   `          ( \__/
        |             )     '=.       .,   \
       /             (         \     /  \  /
     /`               `\        |   /    `'
     '..-`\        _.-. `\ _.__/   .=.
          |  _    / \  '.-`    `-.'  /
          \_/ |  |   './ _     _  \.'
               '-'    | /       \ |
                      |  .-. .-.  |
                      \ / o| |o \ /
                       |   / \   |    
                      / `^`   `^` \ I'm still here don't worry
                     /             \
                    | '._.'         \
                    |  /             |
                     \ |             |
                      ||    _    _   /
                      /|\  (_\  /_) /
                      \ \'._  ` '_.'
                       `^^` `^^^`
*/