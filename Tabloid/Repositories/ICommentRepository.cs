using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        Post GetCommentsByPost(int PostId);

        Comment GetCommentById(int id);

        void AddComment(int userProfileId, Comment comment);

        void UpdateComment(Comment comment);

        void DeleteComment(int id);
    }
}
