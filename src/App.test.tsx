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

  it('reveals a deeper explanation after a myth vote', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Myth Busters' })).toBeInTheDocument()
    expect(screen.getByText(/when i share personal data/i)).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: 'False' })[0])
    expect(screen.getByText(/correct/i)).toBeInTheDocument()
    expect(screen.getByText(/three mechanisms are easily confused/i)).toBeInTheDocument()
  })

  it('has no automatically detectable accessibility violations', async () => {
    render(<App />)
    const results = await axe.run(document.body)
    expect(results.violations).toEqual([])
  })
})
