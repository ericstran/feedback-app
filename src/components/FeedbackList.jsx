import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

const FeedbackList = () => {
	const { feedback, isLoading } = useContext(FeedbackContext)

	if (!isLoading && (!feedback || feedback.length === 0))
		return <p>No Feedback Yet</p>

	/* ANIMATION */
	return isLoading ? (
		<Spinner />
	) : (
		<div className='feedback-list'>
			<AnimatePresence>
				{feedback.map(item => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						layout
					>
						<FeedbackItem key={item.id} item={item} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	)

	/* NO ANIMATION */
	// return (
	// 	<div className='feedback-list'>
	// 		{feedback.map(item => (
	// 			<FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
	// 		))}
	// 	</div>
	// )
}

FeedbackList.propTypes = {}

export default FeedbackList
