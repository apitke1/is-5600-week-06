// CardsList.jsx
import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'

const limit = 10

const CardList = ({ data }) => {
  const [offset, setOffset] = useState(0)
  const [products, setProducts] = useState(data.slice(0, limit))

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit))
  }, [offset, limit, data])

  const handlePageChange = (direction) => {
    setOffset((prev) => prev + direction * 10)
  }

  const filterTags = (searchTerm) => {
    const filtered = data.filter((product) =>
      product.tags.some((tag) =>
        tag.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setOffset(0)
    setProducts(filtered.slice(0, limit))
  }

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePageChange(-1)}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePageChange(1)}
          disabled={offset + limit >= data.length}
        />
      </div>
    </div>
  )
}

export default CardList