import * as React from "react"
import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <main>
      <title>Not found</title>
      <h1>Not found</h1>
      <p>Sorry, we couldn't find what you were looking for.</p>
      <Link to="/">Go back to home</Link>
    </main>
  )
}

export default NotFoundPage