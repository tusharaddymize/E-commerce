const RatingFilter = ({
  value,
  onChange,
}) => {
  return (
    <div>

      <h3 className="font-semibold mb-4">

        Rating

      </h3>

      {[4,3,2,1].map((r)=>(
        <label
          key={r}
          className="block"
        >

          <input
            type="radio"
            checked={value===r}
            onChange={()=>onChange(r)}
          />

          {" "}

          {r}★ & Above

        </label>
      ))}

    </div>
  );
};

export default RatingFilter;