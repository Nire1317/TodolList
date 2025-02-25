import React from 'react';
import './shared/style.css';





const TodoList = () => {
    return (
        <div className="container">
            <table>
                <thead className="thead">
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Table rows here */}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;