import { render, screen } from "@testing-library/react"
import SimpleCard from "../SimpleCard"

describe('SimpleCard component', () => {
  test('should render card', () => {
    render(<SimpleCard title="Title" text="Text" />)
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
  })
})