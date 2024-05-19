interface ArrList {
    id: number;
    name: string;
    price: string;
    startRent: string;
    endRent: string;
    year: string;
    created_at: string;
    updated_at: string;
    image_url: string;
}

type idItemType = number;


const filterCars = (arrList: ArrList[],idItem: idItemType) => {
    return arrList.find (({id}) => id === idItem)
}


export default filterCars;