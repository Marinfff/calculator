import Calculator from "./Calculator";

interface Button {
  value: string;
  display: string;
  type: string;
}

class App {
  private numbers: any = document.getElementsByClassName("number");
  private operators: any = document.getElementsByClassName("operator");
  private superOperators: any = document.getElementsByClassName(
    "superOperator"
  );
  private memory: any = document.getElementsByClassName("memory");
  private result: any = document.getElementById("eval");
  private display: any = document.getElementById("screen");
  private clear: any = document.getElementById("clear");
  private calculator: Calculator;

  public constructor(Calculator: Calculator) {
    this.calculator = Calculator;
  }

  public init(): void {
    this.initEval();
    this.initClear();
    this.initArrayOf(this.numbers);
    this.initArrayOf(this.memory);
    this.initArrayOf(this.operators);
    this.initArrayOf(this.superOperators);
  }

  private initArrayOf(elements: Array<HTMLElement>): void {
    for (const element of elements) {
      element.addEventListener("click", () => {
        this.handleClick({
          value: element.id,
          display: element.innerHTML,
          type: element.className
        });
        this.display.innerText = this.calculator.getStack();
      });
    }
  }

  private initEval(): void {
    this.result.addEventListener("click", () => {
      this.display.innerText = this.calculator.getResult().toString();
    });
  }

  private initClear(): void {
    this.clear.addEventListener("click", () => {
      this.calculator.clearStack();
      this.display.innerText = this.calculator.getStack();
    });
  }

  private handleClick(button: Button): void {
    switch (button.type) {
      case "number":
        this.calculator.handleNumber(button);
        break;

      case "operator":
        this.calculator.handleOperator(button);
        break;

      case "superOperator":
        this.calculator.handleSuperOperator(button);
        break;

      case "memory":
        this.calculator.handleMemory(button);
        break;
    }
  }
}

const calcInstance = new Calculator();
const app = new App(calcInstance);

app.init();
