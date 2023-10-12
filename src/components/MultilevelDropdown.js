import React, { useState } from "react";
import * as mdb from "mdb-ui-kit"; // lib
import { Input } from "mdb-ui-kit"; // module
import ReactSelect from "./ReactSelect";

function MultilevelDropdown() {
  const [isReactSelectOpen, setIsReactSelectOpen] = useState(false);

  const toggleReactSelect = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating
    setIsReactSelectOpen(!isReactSelectOpen);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav">
            {/* Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                Select Category
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    All Products
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Category Name »
                  </a>
                  <ul className="dropdown-menu dropdown-submenu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Category Name 1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Category Name 2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Category Name 3 »{" "}
                      </a>
                      <ul className="dropdown-menu dropdown-submenu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Sub Category Name 1
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Sub Category Name 2
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Submenu item 4
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Submenu item 5
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Product »
                  </a>

                  <ul className="dropdown-menu dropdown-submenu">
                    <li onClick={(e) => e.stopPropagation()}>
                      <ReactSelect />
                    </li>

                    {/* <li>
                      <a className="dropdown-item" href="#">
                        Submenu item 1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Submenu item 2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Submenu item 3 »{" "}
                      </a>
                      <ul className="dropdown-menu dropdown-submenu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Multi level 1
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Multi level 2
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Submenu item 4
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Submenu item 5
                      </a>
                    </li> */}
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default MultilevelDropdown;
