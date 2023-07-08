import { render, screen } from "@testing-library/react"
import TimeDisplay from "../TimeDisplay"

describe('TimeDisplay component', () => {
    test('should convert seconds to minutes', () => {
        render(<TimeDisplay seconds={150} timeset={180}/>)
        expect(screen.getByText('0 : 30'))
    })
})
