using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;
using System;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration configuration) : base(configuration) { }


        public void AddSubscription(int subscriber, int poster)
        {
            using (var conn = Connection)
            {
                conn.Open();

                DateTime startDateTime = DateTime.Now;
                // public DateTime BeginDateTime { get; set; }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Subscription (
                            SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime )
                        VALUES (
                            @SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime )";
                    cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscriber);
                    cmd.Parameters.AddWithValue("@ProviderUserProfileId", poster);
                    cmd.Parameters.AddWithValue("@BeginDateTime", startDateTime);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void RemoveSubscription(int subscriber, int poster)
        {
            using (var conn = Connection)
            {
                conn.Open();


                // public DateTime BeginDateTime { get; set; }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Delete from Subscription where SubscriberUserProfileId = @SubscriberUserProfileId and 
                          ProviderUserProfileId = @ProviderUserProfileId";
                    cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscriber);
                    cmd.Parameters.AddWithValue("@ProviderUserProfileId", poster);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public bool CheckForSubscription(int subscriber, int poster)
        {
            using (var conn = Connection)
            {
                conn.Open();

                DateTime startDateTime = DateTime.Now;
                // public DateTime BeginDateTime { get; set; }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select count(id) as count from Subscription        
                                        where SubscriberUserProfileId = @SubscriberUserProfileId 
                                        and ProviderUserProfileId = @ProviderUserProfileId; ";
                    cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscriber);
                    cmd.Parameters.AddWithValue("@ProviderUserProfileId", poster);
                    SqlDataReader reader = cmd.ExecuteReader();
                    int count = 0;

                    while (reader.Read())
                    {
                        count = reader.GetInt32(reader.GetOrdinal("count"));
                    }

                    if (count > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }

        public List<Post> GetAllSubscribersPostsByUserId(int loggedInUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT  p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime,
                            p.IsApproved, p.CategoryId, p.UserProfileId, up.DisplayName, c.Name AS CategoryName
                            FROM Subscription s 
                            JOIN UserProfile up ON s.ProviderUserProfileId = up.Id 
                            JOIN Post p ON p.UserProfileId = up.Id                 
                            LEFT JOIN Category c on c.Id = p.CategoryId   
                            WHERE s.SubscriberUserProfileId = @loggedInUserId and p.IsDeleted = 0 and up.IsDeleted=0";
                    cmd.Parameters.AddWithValue("@loggedInUserId", loggedInUserId);

                    var reader = cmd.ExecuteReader();

                    var subscriptions = new List<Post>() { };
                    while (reader.Read())
                    {
                         subscriptions.Add(NewPostFromDb(reader));
                    };
                       
                    
                    reader.Close();
                    return subscriptions;

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
