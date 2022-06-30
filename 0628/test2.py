import types


class ClassDecorator:
    def __init__(self, func):
        self.numberOfCalls = 0
        self.func = func

    def __call__(self, *args, **kwargs):
        self.numberOfCalls += 1
        return self.func(*args, **kwargs)

    def __get__(self, instance, cls):
        if instance is None:
            return self
        else:
            return types.MethodType(self, instance)
@ClassDecorator
def add(x, y):
    return x + y


class Decorated:
    @ClassDecorator
    def bar(self, x):
        print(self, x)


print(add(2, 3))
print(add(4, 5))
print(add.numberOfCalls)
s = Decorated()
s.bar(1)
s.bar(2)
s.bar(3)
print(Decorated.bar.numberOfCalls)