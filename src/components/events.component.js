import React from 'react';

class EventsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            country: props.country,
            category: props.category,
            venue: props.venue,
            date: props.date,
            time: props.time,
            publishedAt: props.publishedAt,
        };
    }

  

    render() {
        return (
            
                       <div>
                            {/* 1st chart section */}

                            <div className="py-5">

                                <div className="grid grid-cols-1 lg:grid-cols-3 bg-gray-200 rounded-lg overflow-x-hidden overflow-y-hidden">
                                    <div className="p-10 bg-gray-100">
                                        <h2 className="text-xl">{this.props.title} - {this.props.country}</h2>
                                        <h3 className="text-gray-600">{this.props.category}</h3>
                                        <h3 className="text-gray-600">{this.props.venue}</h3>
                                        <h3 className="text-gray-600">{this.props.date}</h3>
                                    </div>
                                    <div className="p-10">
                                        <h2 className="text-gray-600 mb-4">About the race</h2>
                                        <h4 className="">{this.props.content}</h4>
                                    </div>
                                    <div className="w-34">
                                        <img className="w-fit h-full " src="http://www.smartshanghai.com/uploads/articles/2019/smsh1554869744.jpg" alt="events"></img>
                                    </div>
                                </div>
                            </div>
                            </div>
                    
        );
    }
}



export default EventsComponent;