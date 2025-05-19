import React from 'react'
import "./index.css"
import Search from '../../../SearchComponent/search.tsx'
import AddButton from "../../../ButtonComponent/add.tsx"
import DeleteButton from "../../../ButtonComponent/deleteButton.tsx"
import UpdateButton from "../../../ButtonComponent/update.tsx"


const management = () => {
    return (
        <div className="container-computer">
            <Search></Search>

            <div className="content-computer">
                <p className="title">Quản lý phòng máy</p>

                <div className="grid-box">
                    <div className="box">
                        <p className="floor">Tầng 3</p>

                        <div className="class">
                            <p className="name-class">PHÒNG MÁY 1</p>
                            <p className="name-class">B301</p>
                        </div>
                    </div>
                    <div className="box">
                        <p className="floor">Tầng 3</p>

                        <div className="class">
                            <p className="name-class">PHÒNG MÁY 1</p>
                            <p className="name-class">B301</p>
                        </div>
                    </div>
                    <div className="box">
                        <p className="floor">Tầng 3</p>

                        <div className="class">
                            <p className="name-class">PHÒNG MÁY 1</p>
                            <p className="name-class">B301</p>
                        </div>
                    </div>
                    <div className="box">
                        <p className="floor">Tầng 3</p>

                        <div className="class">
                            <p className="name-class">PHÒNG MÁY 1</p>
                            <p className="name-class">B301</p>
                        </div>
                    </div>
                    <div className="box">
                        <p className="floor">Tầng 3</p>

                        <div className="class">
                            <p className="name-class">PHÒNG MÁY 1</p>
                            <p className="name-class">B301</p>
                        </div>
                    </div>
                    <div className="box">
                        <p className="floor">Tầng 3</p>

                        <div className="class">
                            <p className="name-class">PHÒNG MÁY 1</p>
                            <p className="name-class">B301</p>
                        </div>
                    </div>
                    <div className="box">
                        <p className="floor">Tầng 3</p>

                        <div className="class">
                            <p className="name-class">PHÒNG MÁY 1</p>
                            <p className="name-class">B301</p>
                        </div>
                    </div>
                    <div className="box">
                        <p className="floor">Tầng 3</p>

                        <div className="class">
                            <p className="name-class">PHÒNG MÁY 1</p>
                            <p className="name-class">B301</p>
                        </div>
                    </div>
                </div>

                <div className="computer-button">
                    <div className="button">
                        <AddButton></AddButton>
                    </div>
                    <div className="button">
                        <UpdateButton></UpdateButton>
                    </div>
                    <div className="button">
                        <DeleteButton></DeleteButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default management