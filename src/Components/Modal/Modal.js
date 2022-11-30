import React, { useEffect } from "react";
import css from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = (props) => {
	// componentDidMount() {
	//
	// }

	// componentWillUnmount() {
	// 	document.removeEventListener("keydown", this.props.escHandler);
	// }

	useEffect(() => {
		document.addEventListener("keydown", props.escHandler);

		return () => {
			document.removeEventListener("keydown", props.escHandler);
		};

	}, []);

	const { src, alt, closeHandler } = props;
	return (
		<div className={css["overlay"]} onClick={closeHandler}>
			<div className={css["modal"]}>
				<img src={src} alt={alt} />
			</div>
		</div>
	);
};

Modal.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	closeHandler: PropTypes.func.isRequired,
	escHandler: PropTypes.func.isRequired,
};

export default Modal;
