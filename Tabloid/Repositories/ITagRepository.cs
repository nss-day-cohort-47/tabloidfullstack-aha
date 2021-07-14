using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;


namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();
        int Add(Tag add);
        void Delete(int id);
        Tag GetTagById(int id);
        void Edit(Tag toEdit);
        void AddPostTag(int id, int postId);
        void DeletePostTag(int id, int postId);
        List<Tag> GetAllByPost(int postId);
    }
}

