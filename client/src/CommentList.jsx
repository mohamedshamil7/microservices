import React, { useState } from 'react'


const CommentList = ({comments}) => {
    
    const renderedcommentes = comments.map(comment=>{
        return <li key={comment.id} >{comment.content}</li>
    })

  return (
    <ul>
        {renderedcommentes}
    </ul>
  )
}

export default CommentList