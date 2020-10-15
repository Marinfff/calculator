interface Button {
  value: string;
  display: string;
  type: string;
}

class Calculator {
  private stack: Array<Button> = [];
  private openedOperator: Array<boolean>;
  private memory: number;
  private errorMsg: string;
  private toggleMRC: boolean;

  public constructor() {
    this.openedOperator = [];
    this.errorMsg = 'fatal error';
    this.memory = 0;
    this.toggleMRC = false;
  }

  public handleOperator(button: Button): void {
    if (
      this.lastElement() &&
      this.lastElement().type == "number" &&
      this.openedOperator.length
    ) {
      this.stack.push(this.buttonObject(")", "number"));
      this.openedOperator.pop();
      this.stack.push(button);
      return;
    }

    if (this.lastElement() && this.lastElement().type == "operator") {
      this.stack.splice(this.stack.length - 1, 1, button);
      return;
    }

    this.stack.push(button);
  }

  public handleNumber(button: Button): void {
    if (
      this.lastElement() &&
      this.lastElement().type == "number" &&
      (
        button.display === 'e' ||
        this.lastElement().display === 'e' ||
        this.lastElement().display === '^2'
      )
    ) {
      this.stack.push(this.buttonObject("*", "operator"));
    }
    this.stack.push(button);
  }

  public handleMemory(button: Button): void {
    if (
      button.value == "M+" &&
      this.stack.length &&
      this.stack.length < 2 &&
      this.lastElement().type == "number"
    ) {
      this.memory += Number(this.lastElement().value);
      return;
    }
    if (
      button.value == "M-" &&
      this.memory &&
      this.stack.length &&
      this.stack.length < 2 &&
      this.lastElement().type == "number"
    ) {
      this.memory-= Number(this.lastElement().value);
      return;
    }
    if (button.value == "MS") {
      const last = this.memory.toString() || "";
      this.stack.push(this.buttonObject(last, "number"));
      return;
    }
    if (button.value == "MRC") {
      if (!this.toggleMRC) {
        const last = this.memory.toString() || "";
        this.clearStack();
        this.stack.push(this.buttonObject(last, "number"));
      } else {
        this.memory = 0;
      }
      this.toggleMRC = !this.toggleMRC;
    }
  }

  public handleSuperOperator(button: Button): void {
    if (this.lastElement() && this.lastElement().type == "number") {
      this.stack.push(this.buttonObject("*", "operator"));
    }
    this.stack.push(button);
    this.openedOperator.push(true);
  }

  public getResult(): string {
    if (this.lastElement().type == "operator") {
      this.stack.pop();
    }

    if (this.lastElement().type == "number" && this.openedOperator.length) {
      for (const _ of this.openedOperator) {
        this.stack.push(this.buttonObject(")", "number"));
      }
    }

    try {
      const count = this.stack.map(item => item.value).join("");
      const result = eval(count).toString()

      this.clearStack();
      this.stack.push(this.buttonObject(result, "number"));

      return this.handleError(result);
    } catch {
      this.clearStack();
      return "fatal error";
    }
  }

  public getStack(): string {
    return this.stack.map(item => item.display).join("");
  }

  public clearStack(): void {
    this.openedOperator = [];
    this.stack = [];
  }

  private handleError (result: number):string {
    if (isNaN(result)) {
      this.clearStack()
      return  this.errorMsg
    }
    if (!isFinite(result)) {
      this.clearStack()
      return  this.errorMsg
    }
    return result.toString()
  }

  private lastElement(): Button {
    return this.stack[this.stack.length - 1];
  }

  private buttonObject(value: string, type: string): Button {
    return {
      value,
      display: value,
      type: type
    };
  }
}

export default Calculator;
