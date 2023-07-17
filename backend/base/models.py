from django.db import models
from django.contrib.auth.models import User
from django.db.models import OneToOneField

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    isSupplier = models.BooleanField(default=False)
    noticePeriod = models.PositiveIntegerField(null=False, blank=False, default=7)

    def __str__(self):
        return self.user.username

class Supplier(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    address = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.user.username)

    # def __str__(self):
    #     return str(self.user.supplier_set.first()._id)

class Product(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    # rating = models.DecimalField(
    #     max_digits=7, decimal_places=2, null=True, blank=True)
    # numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name 
    
class Review(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True) 
    _id = models.AutoField(primary_key=True, editable=False) 

    def __str__(self):
        return str(self.createdAt)
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)

class Ingredient(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    cost = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.FloatField(null=True, blank=True, default=0)
    unit = models.CharField(max_length=200, null=True, blank=True)
    expirationDate = models.DateField(auto_now_add=False, null=True, blank=True)
    calibratedMin = models.FloatField(null=True, blank=True, default=0)
    _id = models.AutoField(primary_key=True, editable=False)
    class Meta:
        unique_together = ["user", "name"]

    def __str__(self):
        return str(self.name)
    
class MenuItem(models.Model):
    name = models.CharField(max_length=200, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    description = models.TextField(null=True, blank=True)
    totalSold = models.IntegerField(null=True, blank=True, default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        unique_together = ["user", "name"]

    def __str__(self):
        return str(self.name)
    
class MenuIngredient(models.Model):
    menuItem = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        unique_together = ["menuItem", "ingredient"]

    def __str__(self):
        return self.menuItem.name + "_" + self.ingredient.name
    
class Financial(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=False, null=True, blank=True)
    revenue = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)
    cost = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)
    adminCost = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        unique_together = ["user", "date"]

    def __str__(self):
        return str(self.user) + "_" + str(self.date)
    
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=200, null=True)
    message = models.CharField(max_length=200, null=True)
    isRead = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=False, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        unique_together = ["user", "date", "subject", "message"]

    def __str__(self):
        return str(self.user) + "_" + str(self.message)
 
class MenuItemSold(models.Model):
    menuItem = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=False, null=True, blank=True)
    currentTotalSold = models.IntegerField(null=True, blank=True, default=0)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        unique_together = ["menuItem", "date"]

    def __str__(self):
        return str(self.menuItem) + "_sold_" + str(self.date)