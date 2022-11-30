import React, { useEffect } from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";
import PropTypes from "prop-types";

const ImageGallery = (props) => {

	const { images, clickHanlder, page } = props;

	useEffect(() => {
		if (images.length > 12) {
			window.scrollBy({ top: 520, behavior: "smooth" });
		}
	}, [images]);

	return (
		<ul className={css["image-gallery"]}>
			{images.map((image) => {
				return (
					<ImageGalleryItem
						key={image.id}
						id={image.id}
						src={image.small}
						data={image.large}
						alt={image.alt}
						clickHanlder={clickHanlder}
					></ImageGalleryItem>
				);
			})}
		</ul>
	);
};

ImageGallery.propTypes = {
	page: PropTypes.number.isRequired,
	clickHanlder: PropTypes.func.isRequired,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			small: PropTypes.string.isRequired,
			large: PropTypes.string.isRequired,
			alt: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
};

export default ImageGallery;
