function FooterComponent(props) {
    return (
        <div
            className={
                props.position === "absolute"
                    ? props.page === "Home"
                        ? "footer footer-home footer-absolute"
                        : "footer footer-absolute"
                    : "footer"
            }
        >
        </div>
    );
}

export default FooterComponent;
