import React from "react";

export default function CatInfoCard(props: any) {
  return (
    <div className=" w-[90%] grid md:grid-cols-3 grid-cols-2 gap-4 mx-[5%]">
      {props.filterCats.map((cat: any) => (
        <div key={cat.id} className="shadow-md bg-white p-4 rounded-lg">
          <div className="delete-icon-container">
            <i className="fa-solid fa-xmark text-gray-300 hover:text-red-500 cursor-pointer text-[30px] mb-3"></i>
          </div>
          <img className="rounded-sm" src={cat.img_url} alt={cat.img_url} />
          <div className="cat-info">
            <p>
              <article>
                <strong>Name : </strong>
                {cat.name}
              </article>
              <article>
                <strong>Age : </strong>
                {cat.age}
              </article>
              <article>
                <strong>Breed : </strong>
                {cat.breed}
              </article>
              <article>
                <strong>Gender : </strong>
                {cat.gender}
              </article>
              <article>
                <strong>Is it available? : </strong>
                {cat.is_available ? <>Yes</> : <>No</>}
              </article>
              <article>
                <strong>Description : </strong>
                <>{cat.description}</>
              </article>
              <div className=""></div>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
