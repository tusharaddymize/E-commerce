import React, { useState } from "react";

import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";

// ==================================================
// CATEGORY TABLE
// ==================================================

const CategoryTable = ({
  categories,
  loading,

  menuGroups = [],
  subCategories = [],

  onEdit,
  onDelete,

  onAddMenuGroup,
  onEditMenuGroup,
  onDeleteMenuGroup,

  onAddSubCategory,
  onEditSubCategory,
  onDeleteSubCategory,
}) => {
  // ==================================================
  // STATES
  // ==================================================

  const [expandedCategories, setExpandedCategories] =
    useState([]);

  const [expandedGroups, setExpandedGroups] =
    useState([]);

  // ==================================================
  // TOGGLE CATEGORY
  // ==================================================

  const toggleCategory = (id) => {
    setExpandedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ==================================================
  // TOGGLE MENU GROUP
  // ==================================================

  const toggleGroup = (id) => {
    setExpandedGroups((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-gray-500">
          Loading categories...
        </p>
      </div>
    );
  }

  // ==================================================
  // EMPTY
  // ==================================================

  if (!categories.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h3 className="text-xl font-bold text-gray-900">
          No Categories Found
        </h3>

        <p className="mt-2 text-gray-500">
          Create your first category.
        </p>
      </div>
    );
  }

  // ==================================================
  // GET GROUPS
  // ==================================================

  const getGroups = (categoryId) => {
    return menuGroups.filter(
      (group) =>
        group.category?._id === categoryId ||
        group.category === categoryId
    );
  };

  // ==================================================
  // GET SUB CATEGORIES
  // ==================================================

  const getSubCategories = (groupId) => {
    return subCategories.filter(
      (subCategory) =>
        subCategory.menuGroup?._id === groupId ||
        subCategory.menuGroup === groupId
    );
  };

  // ==================================================
  // STATUS BADGE
  // ==================================================

  const StatusBadge = ({ active }) => {
    return (
      <span
        className={`
          inline-flex
          items-center
          justify-center
          min-w-[70px]
          rounded-full
          px-3
          py-1.5
          text-xs
          font-bold
          ${
            active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }
        `}
      >
        {active ? "Active" : "Inactive"}
      </span>
    );
  };

  // ==================================================
  // ACTION BUTTON
  // ==================================================

  const ActionButton = ({
    type,
    onClick,
    title,
    children,
  }) => {
    const styles = {
      edit: "bg-blue-500 hover:bg-blue-600",
      delete: "bg-red-500 hover:bg-red-600",
      add: "bg-green-500 hover:bg-green-600",
    };

    return (
      <button
        type="button"
        onClick={onClick}
        title={title}
        aria-label={title}
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          text-white
          transition
          hover:scale-105
          ${styles[type]}
        `}
      >
        {children}
      </button>
    );
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm">

      {/* ==================================================
          DESKTOP TABLE
      ================================================== */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full min-w-[1050px] table-fixed">

          {/* COLUMN WIDTHS */}

          <colgroup>
            <col className="w-[38%]" />
            <col className="w-[20%]" />
            <col className="w-[15%]" />
            <col className="w-[10%]" />
            <col className="w-[17%]" />
          </colgroup>

          {/* ==================================================
              HEADER
          ================================================== */}

          <thead>
            <tr className="border-b bg-gray-100">

              <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">
                Category / Menu Group / Sub Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">
                Slug
              </th>

              <th className="px-6 py-4 text-center text-sm font-bold text-slate-800">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-bold text-slate-800">
                Sort
              </th>

              <th className="px-6 py-4 text-center text-sm font-bold text-slate-800">
                Actions
              </th>

            </tr>
          </thead>

          {/* ==================================================
              BODY
          ================================================== */}

          <tbody>

            {categories.map((category) => {
              const groups = getGroups(category._id);

              const isCategoryExpanded =
                expandedCategories.includes(category._id);

              return (
                <React.Fragment key={category._id}>

                  {/* ==================================================
                      CATEGORY ROW
                  ================================================== */}

                  <tr
                    className="
                      border-b
                      border-gray-100
                      hover:bg-gray-50
                      transition
                    "
                  >

                    {/* NAME */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            toggleCategory(category._id)
                          }
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-gray-100
                            text-gray-700
                            hover:bg-gray-200
                            transition
                          "
                          title={
                            isCategoryExpanded
                              ? "Collapse category"
                              : "Expand category"
                          }
                        >
                          {isCategoryExpanded ? (
                            <FiChevronDown size={18} />
                          ) : (
                            <FiChevronRight size={18} />
                          )}
                        </button>

                        <div className="min-w-0">

                          <p className="truncate text-base font-bold text-gray-900">
                            {category.name}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            Category
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* SLUG */}

                    <td className="px-6 py-4">
                      <p className="truncate text-sm text-gray-600">
                        {category.slug}
                      </p>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4 text-center">
                      <StatusBadge
                        active={category.isActive}
                      />
                    </td>

                    {/* SORT */}

                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-gray-600">
                        {category.sortOrder ?? 0}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <div className="flex items-center justify-center gap-2">

                        <ActionButton
                          type="edit"
                          title="Edit Category"
                          onClick={() =>
                            onEdit(category)
                          }
                        >
                          <FiEdit2 size={17} />
                        </ActionButton>

                        <ActionButton
                          type="delete"
                          title="Delete Category"
                          onClick={() =>
                            onDelete(category)
                          }
                        >
                          <FiTrash2 size={17} />
                        </ActionButton>

                        <ActionButton
                          type="add"
                          title="Add Menu Group"
                          onClick={() =>
                            onAddMenuGroup(category)
                          }
                        >
                          <FiPlus size={18} />
                        </ActionButton>

                      </div>

                    </td>

                  </tr>


                  {/* ==================================================
                      MENU GROUP ROWS
                  ================================================== */}

                  {isCategoryExpanded &&
                    groups.map((group) => {

                      const subItems =
                        getSubCategories(group._id);

                      const isGroupExpanded =
                        expandedGroups.includes(
                          group._id
                        );

                      return (
                        <React.Fragment
                          key={group._id}
                        >

                          <tr
                            className="
                              border-b
                              border-gray-100
                              bg-gray-50
                              hover:bg-gray-100
                              transition
                            "
                          >

                            {/* GROUP NAME */}

                            <td className="px-6 py-4">

                              <div className="ml-10 flex items-center gap-3">

                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleGroup(
                                      group._id
                                    )
                                  }
                                  className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-white
                                    text-gray-600
                                    shadow-sm
                                    hover:bg-gray-100
                                  "
                                  title={
                                    isGroupExpanded
                                      ? "Collapse menu group"
                                      : "Expand menu group"
                                  }
                                >
                                  {isGroupExpanded ? (
                                    <FiChevronDown size={17} />
                                  ) : (
                                    <FiChevronRight size={17} />
                                  )}
                                </button>

                                <div className="min-w-0">

                                  <p className="truncate text-sm font-semibold text-gray-800">
                                    {group.name}
                                  </p>

                                  <p className="text-xs text-gray-500">
                                    Menu Group
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* SLUG */}

                            <td className="px-6 py-4">
                              <p className="truncate text-sm text-gray-600">
                                {group.slug}
                              </p>
                            </td>

                            {/* STATUS */}

                            <td className="px-6 py-4 text-center">
                              <StatusBadge
                                active={
                                  group.isActive
                                }
                              />
                            </td>

                            {/* SORT */}

                            <td className="px-6 py-4 text-center">
                              <span className="text-sm text-gray-600">
                                {group.sortOrder ?? 0}
                              </span>
                            </td>

                            {/* ACTIONS */}

                            <td className="px-6 py-4">

                              <div className="flex items-center justify-center gap-2">

                                <ActionButton
                                  type="edit"
                                  title="Edit Menu Group"
                                  onClick={() =>
                                    onEditMenuGroup(
                                      group
                                    )
                                  }
                                >
                                  <FiEdit2 size={16} />
                                </ActionButton>

                                <ActionButton
                                  type="delete"
                                  title="Delete Menu Group"
                                  onClick={() =>
                                    onDeleteMenuGroup(
                                      group
                                    )
                                  }
                                >
                                  <FiTrash2 size={16} />
                                </ActionButton>

                                <ActionButton
                                  type="add"
                                  title="Add Sub Category"
                                  onClick={() =>
                                    onAddSubCategory(
                                      group
                                    )
                                  }
                                >
                                  <FiPlus size={17} />
                                </ActionButton>

                              </div>

                            </td>

                          </tr>


                          {/* ==================================================
                              SUB CATEGORY ROWS
                          ================================================== */}

                          {isGroupExpanded &&
                            subItems.map(
                              (subCategory) => (
                                <tr
                                  key={
                                    subCategory._id
                                  }
                                  className="
                                    border-b
                                    border-gray-100
                                    bg-white
                                    hover:bg-gray-50
                                  "
                                >

                                  {/* SUB CATEGORY NAME */}

                                  <td className="px-6 py-4">

                                    <div className="ml-24">

                                      <p className="truncate text-sm font-medium text-gray-700">
                                        {subCategory.name}
                                      </p>

                                      <p className="text-xs text-gray-400">
                                        Sub Category
                                      </p>

                                    </div>

                                  </td>

                                  {/* SLUG */}

                                  <td className="px-6 py-4">
                                    <p className="truncate text-sm text-gray-600">
                                      {subCategory.slug}
                                    </p>
                                  </td>

                                  {/* STATUS */}

                                  <td className="px-6 py-4 text-center">
                                    <StatusBadge
                                      active={
                                        subCategory.isActive
                                      }
                                    />
                                  </td>

                                  {/* SORT */}

                                  <td className="px-6 py-4 text-center">
                                    <span className="text-sm text-gray-600">
                                      {subCategory.sortOrder ?? 0}
                                    </span>
                                  </td>

                                  {/* ACTIONS */}

                                  <td className="px-6 py-4">

                                    <div className="flex items-center justify-center gap-2">

                                      <ActionButton
                                        type="edit"
                                        title="Edit Sub Category"
                                        onClick={() =>
                                          onEditSubCategory(
                                            subCategory
                                          )
                                        }
                                      >
                                        <FiEdit2 size={16} />
                                      </ActionButton>

                                      <ActionButton
                                        type="delete"
                                        title="Delete Sub Category"
                                        onClick={() =>
                                          onDeleteSubCategory(
                                            subCategory
                                          )
                                        }
                                      >
                                        <FiTrash2 size={16} />
                                      </ActionButton>

                                    </div>

                                  </td>

                                </tr>
                              )
                            )}

                        </React.Fragment>
                      );
                    })}

                </React.Fragment>
              );
            })}

          </tbody>

        </table>

      </div>


      {/* ==================================================
          MOBILE / TABLET
      ================================================== */}

      <div className="grid gap-4 p-4 lg:hidden">

        {categories.map((category) => {

          const groups =
            getGroups(category._id);

          const categoryExpanded =
            expandedCategories.includes(
              category._id
            );

          return (
            <div
              key={category._id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
              "
            >

              {/* CATEGORY */}

              <div className="p-4">

                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        toggleCategory(
                          category._id
                        )
                      }
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-gray-100
                      "
                    >
                      {categoryExpanded ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    <div className="min-w-0">

                      <h3 className="truncate text-base font-bold text-gray-900">
                        {category.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                        Category
                      </p>

                    </div>

                  </div>

                  <StatusBadge
                    active={category.isActive}
                  />

                </div>


                {/* DETAILS */}

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400">
                      Slug
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-gray-700">
                      {category.slug}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400">
                      Sort
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {category.sortOrder ?? 0}
                    </p>
                  </div>

                </div>


                {/* ACTIONS */}

                <div className="mt-4 flex gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      onEdit(category)
                    }
                    className="
                      flex-1
                      rounded-xl
                      bg-blue-500
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDelete(category)
                    }
                    className="
                      flex-1
                      rounded-xl
                      bg-red-500
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onAddMenuGroup(
                        category
                      )
                    }
                    className="
                      rounded-xl
                      bg-green-500
                      px-4
                      py-2.5
                      font-bold
                      text-white
                    "
                  >
                    +
                  </button>

                </div>

              </div>


              {/* MENU GROUPS */}

              {categoryExpanded && (
                <div className="border-t bg-gray-50 p-3">

                  {groups.length === 0 ? (
                    <p className="py-3 text-center text-sm text-gray-400">
                      No menu groups found.
                    </p>
                  ) : (
                    <div className="space-y-3">

                      {groups.map((group) => {

                        const subItems =
                          getSubCategories(
                            group._id
                          );

                        const groupExpanded =
                          expandedGroups.includes(
                            group._id
                          );

                        return (
                          <div
                            key={group._id}
                            className="
                              rounded-xl
                              border
                              border-gray-200
                              bg-white
                              p-3
                            "
                          >

                            <div className="flex items-center justify-between gap-2">

                              <div className="flex min-w-0 items-center gap-2">

                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleGroup(
                                      group._id
                                    )
                                  }
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-gray-100
                                  "
                                >
                                  {groupExpanded ? (
                                    <FiChevronDown />
                                  ) : (
                                    <FiChevronRight />
                                  )}
                                </button>

                                <div className="min-w-0">

                                  <p className="truncate text-sm font-semibold text-gray-800">
                                    {group.name}
                                  </p>

                                  <p className="text-xs text-gray-500">
                                    Menu Group
                                  </p>

                                </div>

                              </div>

                              <StatusBadge
                                active={
                                  group.isActive
                                }
                              />

                            </div>


                            <div className="mt-3 flex gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  onEditMenuGroup(
                                    group
                                  )
                                }
                                className="
                                  flex-1
                                  rounded-lg
                                  bg-blue-500
                                  py-2
                                  text-xs
                                  font-semibold
                                  text-white
                                "
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  onDeleteMenuGroup(
                                    group
                                  )
                                }
                                className="
                                  flex-1
                                  rounded-lg
                                  bg-red-500
                                  py-2
                                  text-xs
                                  font-semibold
                                  text-white
                                "
                              >
                                Delete
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  onAddSubCategory(
                                    group
                                  )
                                }
                                className="
                                  rounded-lg
                                  bg-green-500
                                  px-3
                                  py-2
                                  text-xs
                                  font-bold
                                  text-white
                                "
                              >
                                + Sub
                              </button>

                            </div>


                            {/* SUB CATEGORIES */}

                            {groupExpanded && (
                              <div className="mt-3 space-y-2 border-l-2 border-gray-200 pl-3">

                                {subItems.length ===
                                0 ? (
                                  <p className="py-2 text-xs text-gray-400">
                                    No sub categories.
                                  </p>
                                ) : (
                                  subItems.map(
                                    (sub) => (
                                      <div
                                        key={
                                          sub._id
                                        }
                                        className="
                                          rounded-lg
                                          bg-gray-50
                                          p-3
                                        "
                                      >

                                        <div className="flex items-center justify-between gap-2">

                                          <div className="min-w-0">

                                            <p className="truncate text-sm font-medium text-gray-700">
                                              {sub.name}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                              Sub Category
                                            </p>

                                          </div>

                                          <StatusBadge
                                            active={
                                              sub.isActive
                                            }
                                          />

                                        </div>


                                        <div className="mt-2 flex gap-2">

                                          <button
                                            type="button"
                                            onClick={() =>
                                              onEditSubCategory(
                                                sub
                                              )
                                            }
                                            className="
                                              flex-1
                                              rounded-lg
                                              bg-blue-500
                                              py-2
                                              text-xs
                                              font-semibold
                                              text-white
                                            "
                                          >
                                            Edit
                                          </button>

                                          <button
                                            type="button"
                                            onClick={() =>
                                              onDeleteSubCategory(
                                                sub
                                              )
                                            }
                                            className="
                                              flex-1
                                              rounded-lg
                                              bg-red-500
                                              py-2
                                              text-xs
                                              font-semibold
                                              text-white
                                            "
                                          >
                                            Delete
                                          </button>

                                        </div>

                                      </div>
                                    )
                                  )
                                )}

                              </div>
                            )}

                          </div>
                        );
                      })}

                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default CategoryTable;