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
                    cmd.CommandText = @" SELECT  p.Content
FROM Subscription s  JOIN UserProfile up ON s.ProviderUserProfileId = up.Id 
 JOIN Post p ON p.UserProfileId = up.Id  
WHERE s.SubscriberUserProfileId = @loggedInUserId and p.IsDeleted = 0";
                    cmd.Parameters.AddWithValue("@loggedInUserId", loggedInUserId);


                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Post> subscriptions = new List<Post>() { };
                    while (reader.Read())
                    {
                        Post post = new Post()
                        {
                            Content = reader.GetString(reader.GetOrdinal("Content"))
                        };
                        subscriptions.Add(post);
                    }
                    reader.Close();
                    return subscriptions;

                }
            }
        }

    }
}
