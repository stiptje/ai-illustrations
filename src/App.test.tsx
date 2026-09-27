import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import axe from 'axe-core'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
  window.history.replaceState({}, '', '/')
})

describe('AI Illustrations', () => {
  it('opens the journey from the home page', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /begin the journey/i }))
    expect(screen.getByRole('heading', { name: /before there is data/i })).toBeInTheDocument()
  })

  it('reveals the explanation after a myth verdict', () => {
    window.history.replaceState({}, '', '/myth-reality')
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Myth' }))
    expect(screen.getByText(/ordinary generation is not conventional document lookup/i)).toBeInTheDocument()
  })

  it('filters the concept atlas', () => {
    window.history.replaceState({}, '', '/concepts')
    render(<App />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'softmax' } })
    expect(screen.getByRole('heading', { name: 'Softmax' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Vector' })).not.toBeInTheDocument()
  })

  it('has no automatically detectable accessibility violations on the home page', async () => {
    render(<App />)
    const results = await axe.run(document.body)
    expect(results.violations).toEqual([])
  })
})
