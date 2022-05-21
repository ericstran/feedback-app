import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = props => {
	const children = props.children
	const [feedback, setFeedback] = useState([
		{
			id: 1,
			text: 'This is feedback item 1',
			rating: 10
		},
		{
			id: 2,
			text: 'This is feedback item 2',
			rating: 4
		},
		{
			id: 3,
			text: 'This is feedback item 3',
			rating: 7
		}
	])
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		isEditing: false
	})

	// Add feedback card
	const addFeedback = newFeedback => {
		newFeedback.id = uuidv4()
		setFeedback([newFeedback, ...feedback])
	}

	// Update feedback card
	const updateFeedback = (id, updatedItem) => {
		setFeedback(
			feedback.map(item =>
				item.id === id ? { ...item, ...updatedItem } : item
			)
		)
		setFeedbackEdit({
			item: {},
			edit: false
		})
	}

	// Delete feedback card
	const deleteFeedback = id => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter(item => item.id !== id))
		}
	}

	// Edit feedback card
	const editFeedback = item => {
		setFeedbackEdit({
			item: item,
			isEditing: true
		})
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				deleteFeedback,
				addFeedback,
				editFeedback,
				updateFeedback
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}

export default FeedbackContext
