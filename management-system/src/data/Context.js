import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        products: [
            {
                "_id": "1",
                "title": "cabin_201",
                "src": "https://i.pinimg.com/550x/95/d6/74/95d67402effa2b1ebd305f25d0fc438e.jpg",
                "Newcabin": "Game of Thrones",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Projector, Board, Marker, Landline.",
                "capacity": 3,
                "Teamsize": "one",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "2",
                "title": "cabin_202",
                "src": "https://stylesatlife.com/wp-content/uploads/2020/01/small-office-cabin-design.jpg",
                "Newcabin": "Harry Potter",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Board, Marker, Landline",
                "capacity": 4,
                "Teamsize": "one",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "3",
                "title": "cabin_203",
                "src": "https://i.pinimg.com/550x/79/4d/9f/794d9f4edbecc2e09322bb2ddd863af7.jpg",
                "Newcabin": "Money Heist",
                "content": "FEATURES:Light, Capacity, Wifi access, Projector, Board, Marker, Landline",
                "capacity": 3,
                "Teamsize": "one",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "4",
                "title": "cabin_204",
                "src": "https://i.pinimg.com/474x/94/15/67/9415677f57417af2e262259b7c38766c.jpg",
                "Newcabin": "House of the Dragon",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Projector, Landline",
                "capacity": 1,
                "Teamsize": "one",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "5",
                "title": "cabin_205",
                "src": "https://creativeshelf.ae/wp-content/uploads/2021/11/executive-office.jpeg",
                "Newcabin": "Avengers",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Projector, Board, Marker",
                "capacity": 5,
                "Teamsize": "one",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "6",
                "title": "cabin_206",
                "src": "https://i.pinimg.com/736x/4c/5f/9b/4c5f9b5b33ac4833bfbbfc395df152ce.jpg",
                "Newcabin": "Men in Black",
                "content": "FEATURES: Ac, Light, Capacity, Projector, Board, Marker, Landline",
                "capacity": 1,
                "Teamsize": "two",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "7",
                "title": "cabin_301",
                "src": "https://i.pinimg.com/736x/0d/26/c7/0d26c76dba1ea102554246985d8a5558.jpg",
                "Newcabin": "Bahubali",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Projector, Board, Marker, Landline",
                "capacity": 2,
                "Teamsize": "two",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "8",
                "title": "cabin_302",
                "src": "https://i.pinimg.com/736x/0b/8b/73/0b8b73aca3e72dd6003871aff7d2c298.jpg",
                "Newcabin": "Little Finger",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Projector, Board, Marker, Landline",
                "capacity": 9,
                "Teamsize": "two",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "9",
                "title": "cabin_303",
                "src": "https://i.pinimg.com/originals/11/b9/40/11b940e3766632716bf932f61fe61d92.jpg",
                "Newcabin": "Gost Rider",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Projector, Board, Marker, Landline",
                "capacity": 5,
                "Teamsize": "two",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "10",
                "title": "cabin_304",
                "src": "https://i.pinimg.com/736x/4c/5f/9b/4c5f9b5b33ac4833bfbbfc395df152ce.jpg",
                "Newcabin": "Final Destination",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Projector, Board, Marker, Landline",
                "capacity": 5,
                "Teamsize": "two",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "11",
                "title": "cabin_305",
                "src": "https://64.media.tumblr.com/b8e803259c6b8f6ecdd5882bdbbb77de/4a5743619c1bddc8-95/s540x810/6c6076849f9ca2243a0ae485bae07c42bdaadfd6.jpg",
                "Newcabin": "Wanted",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Board, Marker, Landline",
                "capacity": 3,
                "Teamsize": "three",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            },
            {
                "_id": "12",
                "title": "cabin_306",
                "src": "https://i.pinimg.com/736x/a8/82/27/a8822794050a4989713a0d57163988db.jpg",
                "Newcabin": "KGF",
                "content": "FEATURES: Ac, Light, Capacity, Wifi access, Projector, Board, Marker, Landline",
                "capacity": 7,
                "Teamsize": "four",
                "description": "The regulations state that every room where people work must have sufficient floor area, height and unoccupied space for the purpose of health, safety and welfare. This means that employees must be provided with enough space to access workstations and move around freely in the room in which they work.",
                "count": 1
            }
        ],
        cart: [],
        total: 0

    };

    addCart = (id) => {
        const { products, cart } = this.state;
        const check = cart.every(item => {
            return item._id !== id
        })
        if (check) {
            const data = products.filter(product => {
                return product._id === id
            })
            this.setState({ cart: [...cart, ...data] })
        } else {
            alert("The product has been added to cart.")
        }
    };

    reduction = id => {
        const { cart } = this.state;
        cart.forEach(item => {
            if (item._id === id) {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    };

    increase = id => {
        const { cart } = this.state;
        cart.forEach(item => {
            if (item._id === id) {
                item.count += 1;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    };

    removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            const { cart } = this.state;
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            this.setState({ cart: cart });
            this.getTotal();
        }

    };

    getTotal = () => {
        const { cart } = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        }, 0)
        this.setState({ total: res })
    };

    componentDidUpdate() {
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount() {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart !== null) {
            this.setState({ cart: dataCart });
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            this.setState({ total: dataTotal });
        }
    }


    render() {
        const { products, cart, total } = this.state;
        const { addCart, reduction, increase, removeProduct, getTotal } = this;
        return (
            <DataContext.Provider
                value={{ products, addCart, cart, reduction, increase, removeProduct, total, getTotal }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


