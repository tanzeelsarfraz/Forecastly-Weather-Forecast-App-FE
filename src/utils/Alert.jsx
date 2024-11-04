export default function Alert(props) {
  const capitalizeFirstCharacter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.messageType} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalizeFirstCharacter(props.alert.messageType)}: </strong>{" "}
          {props.alert.message}
        </div>
      )}
    </div>
  );
}
