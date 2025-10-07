import React, { useState } from "react";
import logo from "../../../../public/udslogo.png";

const TreeNode = ({ node, getTreeData }) => {
  // const isActive = node.id === activeNodeId; 
  const [active, setActive] = useState(false);

  const handleClick = () => {
    getTreeData(node._id);
  };

  return (
    <div className="flex flex-col items-center relative">
      <div
        onClick={handleClick}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className={`p-2 border rounded-full shadow cursor-pointer transition bg-white ${node?.isActive ? "border-green-500" : "border-gray-500"}`}
      >
        <img
          src={logo}
          alt={node.name}
          className={`w-12 h-12 object-contain ${node?.isActive ? "" : "grayscale"}`}
        />
      </div>
      <div className="text-sm text-gray-700 mt-1">{node.userId}</div>

      {/* Details shown only when active */}
      {active && (
        <div className="absolute top-full mt-10 p-2 bg-white border shadow-md rounded text-sm z-10 w-56 text-left">
          <div><span className="font-semibold">Distributor ID:</span> {node.userId}</div>
          <div><span className="font-semibold">Name:</span> {node.name.firstName + " " + node.name.middleName + " " + node.name.lastName}</div>
          <div><span className="font-semibold">DOJ:</span> {new Date(node.dateOfJoining).toLocaleDateString()}</div>
          {node.sponsorId !== '000' && (
            <>
              <div><span className="font-semibold">Sponsor ID:</span> {node.sponsorId}</div>
              <div><span className="font-semibold">Sponsor Name:</span> {node.sponsorName}</div>
            </>
          )}
        </div>
      )}

      {node.children && node.children.length > 0 && (
        <>
          <div className="h-6 w-px bg-gray-400"></div>

          <div className="relative flex items-start justify-center mt-0.5">    
             <div
              className="absolute  top-0 h-px bg-gray-400 z-0"
              style={{
                left: node.children.length > 1 ? "25%" : "50%",
                right: node.children.length > 1 ? "25%" : "50%",
              }}
            />

            {node.children.map((child, index) => (
              <div
                key={child.id}
                className="flex flex-col items-center mx-4 relative z-10"
              >
                <div className="h-3 w-px bg-gray-400"></div>
                <TreeNode
                  node={child}
                  getTreeData={getTreeData}
                  key={child._id}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TreeNode;