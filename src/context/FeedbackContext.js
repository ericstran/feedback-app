import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = props => {
	const children = props.children
	const [isLoading, setIsLoading] = useState(true)
	const [feedback, setFeedback] = useState([])
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		isEditing: false
	})

	useEffect(() => {
		fetchFeeback()
	}, [])

	// Fetch feedback data
	const fetchFeeback = async () => {
		const response = await fetch('/feedback?_sort=id&_order=desc')
		const data = await response.json()
		setFeedback(data)
		setIsLoading(false)
	}

	// Add feedback card
	const addFeedback = async newFeedback => {
		const response = await fetch('/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newFeedback)
		})

		const data = await response.json()

		setFeedback([data, ...feedback])
	}

	// Update feedback card
	const updateFeedback = async (id, updatedItem) => {
		const response = await fetch(`/feedback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedItem)
		})

		const data = await response.json()

		setFeedback(
			feedback.map(item => (item.id === id ? { ...item, ...data } : item))
		)
		setFeedbackEdit({
			item: {},
			edit: false
		})
	}

	// Delete feedback card
	const deleteFeedback = async id => {
		if (window.confirm('Are you sure you want to delete?')) {
			await fetch(`/feedback/${id}`, { method: 'DELETE' })

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
				isLoading,
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
