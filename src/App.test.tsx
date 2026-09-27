import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import axe from 'axe-core'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('AI illustrated story', () => {
  it('shows the complete story without requiring phase navigation', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /llms illustrated/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /how does an ai learn to talk/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /people make language/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /reply appears one piece at a time/i })).toBeInTheDocument()
    expect(screen.getByText(/ids are only labels/i)).toBeInTheDocument()
  })

  it('shows myths and realities together', () => {
    render(<App />)
    expect(screen.getByText('It stores every answer.')).toBeInTheDocument()
    expect(screen.getByText('It learns patterns across many examples.')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /it stores every answer/i }))
    expect(screen.getByText(/constructs a new continuation/i)).toBeInTheDocument()
    expect(screen.getByText(/feels like a searchable archive/i)).toBeInTheDocument()
  })

  it('has no automatically detectable accessibility violations', async () => {
    render(<App />)
    const results = await axe.run(document.body)
    expect(results.violations).toEqual([])
  })
})
