using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;


namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAll());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("deleteposttag")]
        public IActionResult DeletePostTag(int id, int postid)
        {
            _tagRepository.DeletePostTag(id, postid);
            return NoContent();
        }

        [HttpPost]
        public IActionResult AddTag(Tag tag)
        {
            _tagRepository.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

        [HttpPost("addposttag")]
        public IActionResult AddPostTag(int tagid,int postid)
        {
            _tagRepository.AddPostTag(tagid, postid);
            return Ok(tagid);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagRepository.Edit(tag);
            return Ok(tag);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepository.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        [HttpGet("posttag/{id}")]
        public IActionResult GetAllByPost(int id)
        {
            var tags = _tagRepository.GetAllByPost(id);
            if (tags == null)
            {
                return NotFound();

            }
            return Ok(tags);
        }

        [HttpGet("tagsnotonpost/{id}")]
        public IActionResult GetTagsNotonPost(int id)
        {
            var tags = _tagRepository.GetTagsNotonPost(id);
            if (tags == null)
            {
                return NotFound();

            }
            return Ok(tags);
        }
    }
}
