import React from "react";

const EticketHTML = ({
  selectedSeatsString,
  luggageType,
  weight,
  totalAmount,
}) => {
  return (
    <html>
      <head>
        <style>
          {`
            .container {
              flex: 1;
              padding: 20px;
              margin-top: 80px;
            }
            .title {
              font-size: 28px;
              font-weight: 700;
              color: #03045E;
              margin-bottom: 32px;
            }
            .miniTitle {
              font-size: 22px;
              font-weight: 700;
              color: #03045E;
              margin-bottom: 10px;
            }
            .ticketContainer {
              border-radius: 10px;
              background-color: #c7dcff;
              width: 100%;
              padding-bottom: 10px;
            }
            .flexBox {
              background-color: #87cefa;
              border-radius: 8px;
              padding: 16px;
            }
            .item {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-bottom: 0.5px;
            }
            .label {
              color: black;
              font-weight: bold;
              font-size: 18px;
            }
            .value {
              color: black;
              font-size: 18px;
            }
            .content {
              align-items: center;
            }
            .contentTitle {
              font-size: 24px;
              font-weight: bold;
              margin: 4px;
            }
            .contentText {
              font-size: 20px;
            }
            .contentView {
              padding: 4px;
              margin-top: 8px;
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <h1 className="title">E-Ticket</h1>

          <div className="ticketContainer">
            <div className="flexBox">
              <div className="item">
                <span className="label">Bus Number:</span>
                <span className="value">234</span>
              </div>

              <div className="item">
                <span className="label">Time:</span>
                <span className="value">10.30 AM</span>
              </div>

              <div className="item">
                <span className="label">Start:</span>
                <span className="value">Kadawatha</span>
              </div>

              <div className="item">
                <span className="label">Destination:</span>
                <span className="value">Makumbura</span>
              </div>
            </div>

            <div className="content">
              <div>
                <h2 className="contentTitle">Seats</h2>
              </div>

              <div className="contentView">
                <span className="contentText" style="font-weight: 500;">
                  Seat No:
                </span>
                <span className="contentText">{selectedSeatsString}</span>
              </div>

              <div>
                <h2 className="contentTitle">Luggage</h2>
              </div>

              <div className="contentView">
                <span className="contentText" style="font-weight: 500;">
                  Type:
                </span>
                <span className="contentText">{luggageType}</span>
              </div>

              <div className="contentView">
                <span className="contentText" style="font-weight: 500;">
                  Weight:
                </span>
                <span className="contentText">{weight}Kg</span>
              </div>

              <div className="content">
                <h2 className="contentTitle">Total Amount</h2>
                <span className="contentText">Rs. {totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default EticketHTML;
