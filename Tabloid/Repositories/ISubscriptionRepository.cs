using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        void AddSubscription(int subscriber, int poster);

        List<Post> GetAllSubscribersPostsByUserId(int loggedInUserId);
        public bool CheckForSubscription(int subscriber, int poster);

        public void RemoveSubscription(int subscriber, int poster);
    }
}
