import PropTypes from 'prop-types'

const Button = props => {
	const children = props.children
	const version = props.version
	const type = props.type
	const isDisabled = props.isDisabled

	return (
		<button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
			{children}
		</button>
	)
}

Button.defaultProps = {
	version: 'primary',
	type: 'button',
	isDisabled: false
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	version: PropTypes.string,
	type: PropTypes.string,
	isDisabled: PropTypes.bool
}

export default Button
