import React, { useState, useEffect} from 'react'
import 'app.css'
import {ThoughtForm} from './components/ThoughtForm'
import {ThoughtCard} from './components/ThoughtCard'

export const App = () => {
  const [ data, setData ] = useState([])
  const [ newMessage, setNewMessage] = useState('')

  useEffect (() => {
    fetch("https://plunta-happy-thought-api.herokuapp.com/")
    .then(res => res.json())
    .then(json => setData(json))
    .catch((error) => {
      console.error('Error:', error);
    })
  }, [newMessage])

  const handleSubmit = (message) => {
    fetch('https://plunta-happy-thought-api.herokuapp.com/', { 
    method: 'POST', 
    body: JSON.stringify({ message }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .then((newThought) => {
      setNewMessage((previousThoughts) => [newThought, ...previousThoughts])
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  const onLiked = (thoughtId) => {
    const updatedThoughts = data.map(thought => {
      return thought
    })
    setNewMessage(updatedThoughts)
  }

  return (
    <section className="container">

      <ThoughtForm onSubmit={handleSubmit}/>
      {data.map(item => {
        return (
          <ThoughtCard key={item._id} id={item._id} message={item.message} hearts={item.hearts} CreatedAt={item.createdAt} onLiked={onLiked} />
        )
      })}

    </section>
  )
}
