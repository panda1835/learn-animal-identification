import packData from "../../../../../data/pack/pack.json";
import snakeData from "../../../../../data/snake/snake_vietnam.json";

import ListPage from "../../../../../components/ListPage";

const ListPackSpecies = ({ params: { packId } }) => {
  const pack = packData[packId];
  const snakeList = {};
  pack["species"].map((speciesId) => {
    snakeList[speciesId] = snakeData[speciesId];
  });

  return (
    <div className="mt-5">
      <h1>
        Danh sách {Object.keys(snakeList).length} loài trong gói {pack.name}
      </h1>
      <ListPage snakeList={snakeList} />
    </div>
  );
};

export default ListPackSpecies;
