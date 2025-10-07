import React, { useEffect, useState } from "react";
import TreeNode from "./TreeNode";
import logo from "../../../../public/udslogo.png";
import { getUserTree } from "../../../api/user.api";
import { useSelector } from "react-redux";

const staticTreeData = [
  {
    id: 1,
    name: "Parent 1",
    userId: "USR001",
    details: "Manager, Delhi",
    children: [
      {
        id: 2,
        name: "Child 1.1",
        userId: "USR002",
        details: "Developer, Mumbai",
        children: [
          {
            id: 3,
            name: "Grandchild 1.1.1",
            userId: "USR003",
            details: "Intern, Pune",
            children: [],
          },
          {
            id: 4,
            name: "Grandchild 1.1.2",
            userId: "USR004",
            details: "QA, Bangalore",
            children: [],
          },
        ],
      },
      {
        id: 5,
        name: "Child 1.2",
        userId: "USR005",
        details: "Designer, Hyderabad",
        children: [
          {
            id: 6,
            name: "Grandchild 1.2.1",
            userId: "USR006",
            details: "Content, Chennai",
            children: [],
          },
          {
            id: 7,
            name: "Grandchild 1.2.2",
            userId: "USR007",
            details: "HR, Noida",
            children: [],
          },
        ],
      },
    ],
  },
];


const TreeView = () => {
  const [treeData, setTreeData] = useState([]);
  const user = useSelector((state) => state.auth);
  const userDetails = user?.user || {};

  const [loading, setLoading] = useState(true);

  const [rootNode, setRootNode] = useState(null)
  const [currentRootUserId, setCurrentRootUserId] = useState(null);


  useEffect(() => {
    getTreeData(userDetails?._id);
  }, []);


  const getTreeData = async (userId) => {
    try {
      setLoading(true);
      const response = await getUserTree(userId); 
      setTreeData(response?.data);
      setRootNode(response?.data?.[0]?.parentId);
      setCurrentRootUserId(userId);
      console.log(response?.data?.[0]?.parentId);

    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="space-y-6 w-full">
        {rootNode && currentRootUserId !== userDetails?._id && (
          <div className="w-full flex items-center justify-end mb-4">
            <button className="bg-white text-black px-4 py-2 rounded shadow hover:bg-blue-600 hover:text-white transition " onClick={() => getTreeData(rootNode)}>
              Back
            </button>
          </div>
        )}
        {treeData.map((node) => (
          <TreeNode
            key={node._id}
            node={node}
            getTreeData={getTreeData}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeView;
