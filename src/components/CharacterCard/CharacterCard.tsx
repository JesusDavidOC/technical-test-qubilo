import "./CharacterCard.scss";
import { CharacterCardProps } from "./CharacterCard.interfaces";

export default function CharacterCard({
  name,
  image,
  extraData,
}: Readonly<CharacterCardProps>) {
  return (
    <div className="characterCard">
      <div
        className="characterCardBackground"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="content">
        <div className="name">
          <span>{name}</span>
        </div>
        <div className="extraData">
          <span>
            {extraData.species} - {extraData.gender}
          </span>
        </div>
      </div>
    </div>
  );
}
