using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public PostsController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPosts());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("userProfileId/{userProfileId}")]
        public IActionResult GetPostByUserProfileId(int userProfileId)
        {
            var posts = _postRepository.GetPostByUserProfileId(userProfileId);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult AddPost(Post post)
        {
            var currentUser = GetCurrentUserProfile2();
            post.UserProfileId = currentUser.Id;
            DateTime dateCreated = DateTime.Now;

            post.CreateDateTime = dateCreated;
            post.IsApproved = true;

            _postRepository.AddPost(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            var currentUser = GetCurrentUserProfile2();
            if (post.UserProfileId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.UpdatePost(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.DeletePost(id);
            return NoContent();
        }
        [HttpGet("GetAllUserPosts")]
        public IActionResult GetAllUserPosts()
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var posts = _postRepository.GetAllUserPosts(user);
                return Ok(posts);
            }
        }
        private UserProfile GetCurrentUserProfile2()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        private string GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (firebaseUserId != null)
            {
                
                return firebaseUserId;
            }
            else
            {
                return null;
            }
        }
    }
}

