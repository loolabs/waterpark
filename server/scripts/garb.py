def test(testlist, toremove, count=1, append_empty=True):
    while True:
        for i in range(count):
            testlist.remove(toremove)
    return testlist