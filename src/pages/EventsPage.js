import React from "react";
import EventsComponent from "../components/events.component"
class EventsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogList: [
                {
                    id: 1,
                    title: "Spartan Race",
                    country: "Philippines",
                    category: "Sprint | Super | HH24",
                    venue: "Daang Hari, Vermosa",
                    date: "February 18, 2023",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                },

            ]

        }
    }

    addPost = () => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const country = document.getElementById('country').value;
        const category = document.getElementById('category').value;
        const venue = document.getElementById('venue').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        this.setState({
            blogList: [
                ...this.state.blogList,
                {
                    id: this.state.blogList.length + 1,
                    title: title,
                    country: country,
                    category: category,
                    venue: venue,
                    date: date,
                    time: time,
                    content: content,
                    publishedAt: new Date().toISOString().split('T')[0],
                }
            ]
        });

    }


    render() {
        return (
            <div className="h-screen w-full" >
                <div className="lg:flex bg-white">
                    {/* Main Content */}
                    <div className="lg:w-3/4 md:w-screen w-fit h-fit lg:h-screen px-10 py-7 lg:py-0 md:px-16 lg:ml-0">

                        <h2 className="text-4xl font-bold text-center mt-8">Your Events</h2>

                        <section className="justify-center items-center mt-3">
                            {/* 1st chart section */}

                            {
                                this.state.blogList.map((blog, index) => {
                                    return <EventsComponent key={index} id={blog.id} title={blog.title} publishedAt={blog.publishedAt}
                                        country={blog.country}
                                        category={blog.category}
                                        venue={blog.venue}
                                        date={blog.date} content={blog.content} />
                                })
                            }

                        </section>

                        {/* 3rd section */}

                        <h2 className="text-xl text-center items-center mt-20 font-semibold text-gray-300">Join more events don't be lazy!</h2>
                    </div>

                    {/* Right Content */}
                    <div className="lg:w-1/4 md:w-screen w-full h-96 lg:h-screen fixed bottom-0 lg:right-0 font-semibold bg-gray-300 py-12 px-10 lg:px-10 md:px-20">


                        <div className="grid grid-cols-2 gap-x-4">

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="height">Event</label>
                                <input
                                    id="title"
                                    className="border border-gray-400 p-2 w-full"
                                    name="title"
                                    placeholder="title"

                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="height">Country</label>
                                <input
                                    id="country"
                                    className="border border-gray-400 p-2 w-full"
                                    name="country"
                                    placeholder="country"

                                />
                            </div>

                            
                        </div>

                        <div className="grid grid-cols-2 gap-x-4">

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
                                <input
                                    id="category"
                                    className="border border-gray-400 p-2 w-full"
                                    name="category"
                                    placeholder="category"

                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="venue">Venue</label>
                                <input
                                    id="venue"
                                    className="border border-gray-400 p-2 w-full"
                                    name="venue"
                                    placeholder="place"

                                />
                            </div>

                            
                        </div>

                        <div className="grid grid-cols-2 gap-x-4">

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Date</label>
                                <input
                                    id="date"
                                    className="border border-gray-400 p-2 w-full"
                                    name="date"
                                    placeholder="dd/mm/yy"

                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="time">Time</label>
                                <input
                                    id="time"
                                    className="border border-gray-400 p-2 w-full"
                                    name="time"
                                    placeholder="am/pm"

                                />
                            </div>

                            
                        </div>

                        <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="time">About</label>
                                <textarea
                                    id="content"
                                    className="border border-gray-400 p-2 w-full"
                                    name="time"
                                    placeholder="description"

                                ></textarea>
                            </div>

                            <div className="mb-6">
                                        <div className="block text-gray-700 font-medium mb-2">
                                            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full" onClick={this.addPost}>Add Event +</button>
                                        </div>
                                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventsPage;