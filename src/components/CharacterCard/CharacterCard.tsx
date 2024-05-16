import "./CharacterCard.scss";
import { CharacterCardProps } from "./CharacterCard.interfaces";

export default function CharacterCard({
  character,
  changeCurrentCharacter,
}: Readonly<CharacterCardProps>) {
  const handleChangeCurrentCharacter = () => {
    changeCurrentCharacter(character);
  };
  return (
    <div className="characterCard" onClick={handleChangeCurrentCharacter}>
      <div
        className="characterCardBackground"
        style={{
          backgroundImage: `url(${character.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="content">
        <div className="name">
          <span>{character.name}</span>
        </div>
        <div className="extraData">
          <span>
            {character.species} - {character.gender}
          </span>
        </div>
      </div>
    </div>
  );
}
