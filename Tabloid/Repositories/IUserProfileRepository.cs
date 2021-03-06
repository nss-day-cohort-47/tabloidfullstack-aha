using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Activate(int id);
        void Add(UserProfile userProfile);
        UserProfile CheckUnique(UserProfile user);
        bool Delete(int id);
        void Edit(UserProfile user);
        List<UserProfile> GetAllUsers();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserById(int id);
    }
}