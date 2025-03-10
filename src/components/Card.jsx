function Card({ image, name, handleClick }) {
  return (
    <>
      <div className="card" onClick={() => handleClick(name)}>
        <img src={image} alt={image} />
        <p>{name}</p>
      </div>
    </>
  );
}
export default Card;
