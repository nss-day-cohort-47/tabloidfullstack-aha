using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public CommentController(ICommentRepository commentRepository,
                                 IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }
        // GET: api/<CommentController>
        [HttpGet("{postId}")]
        public IActionResult Get(int postId)
        {
            return Ok(_commentRepository.GetCommentsByPost(postId));
        }

        // POST api/<CommentController>
        [HttpPost]
        public IActionResult AddComment(int userProfileId, Comment comment)
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
            _commentRepository.AddComment(user.Id, comment);
            return Ok(comment);

            }
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.UpdateComment(comment);
            return Ok(comment);
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }

        [HttpGet("comment/{id}")]
        public IActionResult GetCommentById(int id)
        {
            var comment = _commentRepository.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (firebaseUserId != null)
            {
                var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
                return user;
            }
            else
            {
                return null;
            }
        }
    }
}
