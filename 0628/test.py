def first_name(func):
    def wrapper(*args, **kwargs):
        print("李",end="")
        return func(*args, **kwargs)
    return wrapper

@first_name
def ray_name(name):
    print(name,end="")

ray_name("庭愷")