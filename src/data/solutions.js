// Assignment solution languages and sample solutions.
// Real solutions are added from Admin → Solutions (stored in MongoDB); these samples
// are seeded once and used as the offline fallback.
export const solutionLanguages = [
  { key: "cpp", label: "C++", ext: "cpp" },
  { key: "c", label: "C", ext: "c" },
  { key: "java", label: "Java", ext: "java" },
  { key: "csharp", label: "C#", ext: "cs" },
  { key: "python", label: "Python", ext: "py" },
  { key: "javascript", label: "JavaScript", ext: "js" },
  { key: "php", label: "PHP", ext: "php" },
  { key: "html", label: "HTML", ext: "html" },
  { key: "css", label: "CSS", ext: "css" },
  { key: "sql", label: "SQL", ext: "sql" },
  { key: "assembly", label: "Assembly", ext: "asm" },
  { key: "text", label: "Plain text", ext: "txt" },
];

export const languageOf = (key) => solutionLanguages.find((l) => l.key === key) || solutionLanguages[0];

const solutions = [
  {
    _id: "sample-cs201-grade-calculator",
    subject: "CS201",
    title: "Student grade calculator using functions",
    semester: "Practice",
    language: "cpp",
    description:
      "Write a C++ program that takes the marks of 5 subjects, calculates the total, percentage and grade using separate functions, and prints a formatted result card.\n\nUse your own VU ID as the student ID. Grades: A (80+), B (70–79), C (60–69), D (50–59), F (below 50).",
    code: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

const int SUBJECTS = 5;

// Reads marks for every subject and rejects values outside 0-100.
void inputMarks(int marks[], int size) {
    for (int i = 0; i < size; i++) {
        do {
            cout << "Enter marks of subject " << (i + 1) << " (0-100): ";
            cin >> marks[i];
        } while (marks[i] < 0 || marks[i] > 100);
    }
}

int totalMarks(const int marks[], int size) {
    int total = 0;
    for (int i = 0; i < size; i++) {
        total += marks[i];
    }
    return total;
}

char gradeOf(float percentage) {
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
}

int main() {
    string vuId;
    int marks[SUBJECTS];

    cout << "Enter your VU ID: ";
    cin >> vuId;
    inputMarks(marks, SUBJECTS);

    int total = totalMarks(marks, SUBJECTS);
    float percentage = total * 100.0f / (SUBJECTS * 100);

    cout << "\\n----- Result Card -----\\n";
    cout << "Student ID : " << vuId << endl;
    cout << "Total      : " << total << " / " << SUBJECTS * 100 << endl;
    cout << fixed << setprecision(2);
    cout << "Percentage : " << percentage << "%" << endl;
    cout << "Grade      : " << gradeOf(percentage) << endl;

    return 0;
}
`,
    fileUrl: "",
    published: true,
    createdAt: "2026-09-20T10:00:00.000Z",
  },
  {
    _id: "sample-cs301-linked-list",
    subject: "CS301",
    title: "Singly linked list: insert, delete and display",
    semester: "Practice",
    language: "cpp",
    description:
      "Implement a singly linked list class in C++ with functions to insert at the end, delete a node by value and display the list. Test it with the digits of your VU ID.",
    code: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    Node(int value) : data(value), next(NULL) {}
};

class LinkedList {
    Node* head;

public:
    LinkedList() : head(NULL) {}

    ~LinkedList() {
        while (head != NULL) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }

    void insertAtEnd(int value) {
        Node* node = new Node(value);
        if (head == NULL) {
            head = node;
            return;
        }
        Node* current = head;
        while (current->next != NULL) {
            current = current->next;
        }
        current->next = node;
    }

    bool remove(int value) {
        Node* current = head;
        Node* previous = NULL;
        while (current != NULL && current->data != value) {
            previous = current;
            current = current->next;
        }
        if (current == NULL) return false;  // value not found

        if (previous == NULL) head = current->next;
        else previous->next = current->next;
        delete current;
        return true;
    }

    void display() const {
        for (Node* current = head; current != NULL; current = current->next) {
            cout << current->data << " -> ";
        }
        cout << "NULL" << endl;
    }
};

int main() {
    LinkedList list;
    int digits[] = {2, 3, 0, 4, 1, 2, 3, 4, 5};

    for (int d : digits) {
        list.insertAtEnd(d);
    }
    cout << "List: ";
    list.display();

    list.remove(0);
    cout << "After deleting 0: ";
    list.display();

    return 0;
}
`,
    fileUrl: "",
    published: true,
    createdAt: "2026-09-18T10:00:00.000Z",
  },
];

export default solutions;
