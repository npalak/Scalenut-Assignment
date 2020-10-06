import React from "react";
import ReactDOM from "react-dom";
import "./ab.css";
class ProductCategoryRow extends React.Component {
  render() {
    const CategoryName = this.props.CategoryName;
    return (
      <tr>
        <th colSpan="2">{CategoryName}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const SubCategoryName = product.stocked ? (
      product.SubCategoryName
    ) : (
      <span style={{ color: "red" }}>{product.SubCategoryName}</span>
    );

    return (
      <tr>
        <td>{SubCategoryName}</td>
        <td>{product.price}</td>
        <td>{product.ProductID}</td>
        <td>{product.ProductName}</td>
        <td>{product.CategoryId}</td>
        <td>{product.SubCategoryId}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  state = {
    selectedRow: -1
  };
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategoryName = null;

    this.props.products.forEach((product) => {
      if (product.SubCategoryName.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.CategoryName !== lastCategoryName) {
        rows.push(
          <ProductCategoryRow
            CategoryName={product.CategoryName}
            key={product.CategoryName}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.SubCategoryName} />);
      lastCategoryName = product.CategoryName;
    });

    return (
      <div>
        <table style={{ border: "2px solid black" }}>
          <caption>Filter List Table</caption>
          <thead>
            <tr>
              <th>SubCategoryName</th>
              <th>Price</th>
              <th>ProductID</th>
              <th>ProductName</th>
              <th>CategoryId</th>
              <th>SubCategoryId</th>
            </tr>
          </thead>

          <tbody className="tableHover">
            {this.props.products.map((item, i) => {
              return (
                <tr
                  key={i}
                  onClick={this.changeColor(i)}
                  className={
                    this.state.selectedRow === i ? "tableSelected" : ""
                  }
                ></tr>
              );
            })}{" "}
            {rows}
          </tbody>
        </table>

        <table style={{ border: "2px solid black", marginLeft: "30px" }}>
          <caption>Original table</caption>
          <thead>
            <tr>
              <th>SubCategoryName</th>
              <th>Price</th>
              <th>ProductID</th>
              <th>ProductName</th>
              <th>CategoryId</th>
              <th>SubCategoryId</th>
            </tr>
          </thead>

          <tbody className="tableHover">
            {this.props.products.map((item, i) => {
              return (
                <tr
                  key={i}
                  onClick={this.changeColor(i)}
                  className={
                    this.state.selectedRow === i ? "tableSelected" : ""
                  }
                >
                  <td id="td">{item.SubCategoryName}</td>
                  <td>{item.price}</td>
                  <td>{item.ProductID}</td>
                  <td>{item.ProductName}</td>
                  <td>{item.CategoryId}</td>
                  <td>{item.SubCategoryId}</td>
                </tr>
              );
            })}{" "}
            {/* {rows} */}
          </tbody>
        </table>
      </div>
    );
  }
  changeColor = (selectedRow) => (e) => {
    if (selectedRow !== undefined) {
      this.setState({ selectedRow });
    }
  };
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />{" "}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        {/* <Highlight search={this.state.filterText}>
          The quick brown fox jumps over the lazy dog
          {this.props.search}
        </Highlight> */}
      </div>
    );
  }
}

const PRODUCTS = [
  {
    CategoryName: "Sporting Goods",
    price: "3800",
    stocked: true,
    SubCategoryName: "Football",
    ProductID: "abc111",
    ProductName: "NFootball",
    CategoryId: "C11",
    SubCategoryId: "X66"
  },
  {
    CategoryName: "Sporting Goods",
    price: "7700",
    stocked: true,
    SubCategoryName: "Baseball",
    ProductID: "abc222",
    ProductName: "NBaseball",
    CategoryId: "C12",
    SubCategoryId: "X67"
  },
  {
    CategoryName: "Sporting Goods",
    price: "4200",
    stocked: false,
    SubCategoryName: "Basketball",
    ProductID: "abc333",
    ProductName: "NsBasketball",
    CategoryId: "C13",
    SubCategoryId: "X68"
  },
  {
    CategoryName: "Sporting Goods",
    price: "3700",
    stocked: true,
    SubCategoryName: "Reebok-shoe",
    ProductID: "abc777",
    ProductName: "Adidas brands",
    CategoryId: "D11",
    SubCategoryId: "X66"
  },
  {
    CategoryName: "Sporting Goods",
    price: "1800",
    stocked: true,
    SubCategoryName: "Adidas-Footwear",
    ProductID: "abc888",
    ProductName: "Adidas brands",
    CategoryId: "D12",
    SubCategoryId: "X67"
  },
  {
    CategoryName: "Electronics",
    price: "999",
    stocked: true,
    SubCategoryName: "iPod Touch",
    ProductID: "abc444",
    ProductName: "TouchPod",
    CategoryId: "C14",
    SubCategoryId: "X69"
  },
  {
    CategoryName: "Electronics",
    price: "399",
    stocked: false,
    SubCategoryName: "iPhone 5",
    ProductID: "abc555",
    ProductName: "Phone 5",
    CategoryId: "C15",
    SubCategoryId: "X70"
  },
  {
    CategoryName: "Electronics",
    price: "1199",
    stocked: true,
    SubCategoryName: "Nexus 7",
    ProductID: "abc666",
    ProductName: "Nexus-LK",
    CategoryId: "C16",
    SubCategoryId: "X71"
  },

  {
    CategoryName: "Athletic shoe brands",
    price: "1000",
    stocked: true,
    SubCategoryName: "Nike-shoe",
    ProductID: "abc999",
    ProductName: "Asics‎",
    CategoryId: "D13",
    SubCategoryId: "X68"
  },
  {
    CategoryName: "Athletic shoe brands",
    price: "2200",
    stocked: false,
    SubCategoryName: "Givova",
    ProductID: "abc010",
    ProductName: "Adidas brands",
    CategoryId: "D14",
    SubCategoryId: "X69"
  },
  {
    CategoryName: "Sporting Puma ",
    price: "3000",
    stocked: true,
    SubCategoryName: "Puma-shoe",
    ProductID: "abc011",
    ProductName: "Puma brands",
    CategoryId: "D15",
    SubCategoryId: "X70"
  },
  {
    CategoryName: "Bata Footbare",
    price: "2500",
    stocked: true,
    SubCategoryName: "Bata",
    ProductID: "abc012",
    ProductName: "Bata Corporation",
    CategoryId: "D16",
    SubCategoryId: "X71"
  }
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById("root")
);
