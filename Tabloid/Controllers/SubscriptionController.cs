using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public SubscriptionController(ISubscriptionRepository subscriptionRepository, IUserProfileRepository userProfileRepository)
        {
            _subscriptionRepository = subscriptionRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{postId}")]
        public IActionResult GetSubsciption(int postId)
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var isSubscribed = _subscriptionRepository.CheckForSubscription(user.Id, postId);
                return Ok(isSubscribed);
            }
        }

        [HttpGet("getsubscribepost")]
        public IActionResult GetSubscriptionPosts()
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var posts = _subscriptionRepository.GetAllSubscribersPostsByUserId(user.Id);
                return Ok(posts);
            }
        }

        [HttpPost("{postId}")]
        public IActionResult Post(int postId)
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                _subscriptionRepository.AddSubscription(user.Id, postId);
                return Ok(postId);
            }
        }

        [HttpDelete("{postId}")]
        public IActionResult RemoveSubscription(int postId)
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                _subscriptionRepository.RemoveSubscription(user.Id, postId);
                return NoContent();
            }
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
