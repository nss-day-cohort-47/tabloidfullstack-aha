using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }

        public Post GetCommentsByPost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                               p.Title AS PostTitle, p.Content AS PostContent, p.ImageLocation AS PostImageLocation, p.CreateDateTime AS PostCreateDateTime, p.IsApproved AS PostIsApproved,
                               up.DisplayName AS UserDisplayName, up.FirebaseUserId, up.FirstName AS UserFirstName, up.LastName AS UserLastName, up.Email AS UserEmail, up.CreateDateTime AS UserCreateDateTime, up.ImageLocation AS UserImageLocation, up.UserTypeId
                        FROM Post p
                        LEFT JOIN Comment c ON p.Id = c.PostId
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        WHERE c.PostId = @postId
                    ";
                    cmd.Parameters.AddWithValue("@postId", postId);

                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    while (reader.Read())
                    {
                        if (post == null)
                        {
                            post = new Post()
                            {
                                Id = postId,
                                Title = DbUtils.GetString(reader, "PostTitle"),
                                Content = DbUtils.GetString(reader, "PostContent"),
                                ImageLocation = DbUtils.GetString(reader, "PostImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDateTime"),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("PostIsApproved")),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "UserDisplayName"),
                                    FirstName = DbUtils.GetString(reader, "UserFirstName"),
                                    LastName = DbUtils.GetString(reader, "UserLastName"),
                                    Email = DbUtils.GetString(reader, "UserEmail"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                                    ImageLocation = DbUtils.GetString(reader, "UserImageLocation"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId")
                                },
                                Comments = new List<Comment>()
                            };
                        }

                        if (DbUtils.IsNotDbNull(reader, "Id"))
                        {
                            post.Comments.Add(new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                PostId = postId,
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Subject = DbUtils.GetString(reader, "Subject"),
                                Content = DbUtils.GetString(reader, "Content"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                            });
                        }
                    }
                    reader.Close();

                    return post;
                }
            }
        }

        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
						SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                               p.Title AS PostTitle, p.Content AS PostContent, p.ImageLocation AS PostImageLocation, p.CreateDateTime AS PostCreateDateTime, p.IsApproved AS PostIsApproved,
                               up.DisplayName AS UserDisplayName, up.FirstName AS UserFirstName, up.LastName AS UserLastName, up.Email AS UserEmail, up.CreateDateTime AS UserCreateDateTime, up.ImageLocation AS UserImageLocation, up.UserTypeId
                        FROM Comment c
                        LEFT JOIN Post p ON p.Id = c.PostId
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        WHERE c.Id = @id
					";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                Title = DbUtils.GetString(reader, "PostTitle"),
                                Content = DbUtils.GetString(reader, "PostContent"),
                                ImageLocation = DbUtils.GetString(reader, "PostImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDateTime"),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("PostIsApproved"))
                            },
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "UserDisplayName"),
                                FirstName = DbUtils.GetString(reader, "UserFirstName"),
                                LastName = DbUtils.GetString(reader, "UserLastName"),
                                Email = DbUtils.GetString(reader, "UserEmail"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "UserImageLocation"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId")
                            }
                        };
                        reader.Close();
                        return comment;
                    }
                    reader.Close();
                    return null;
                }
            }
        }

        public void AddComment(int userProfileId, Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (PostId, UserProfileId, Subject, Content, CreateDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@postId, @userProfileId, @subject, @content, @createDateTime)
                    ";

                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@createDateTime", DateTime.Now);

                    int id = (int)cmd.ExecuteScalar();

                    comment.Id = id;
                }
            }
        }

        public void UpdateComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Comment
                            SET 
                                Subject = @subject, 
                                Content = @content                         
                            WHERE Id = @id AND PostId = @postId
                    ";
                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@id", comment.Id);
                    cmd.Parameters.AddWithValue("@postId", comment.PostId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteComment(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Comment SET IsDeleted = 1
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
