import { Controller, Get, Query, Post, Body, Render, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { LoggedInGuard } from './auth/logged-in.guard';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ProductsService: ProductsService,
  ) {}

  @Get()
  @Render('index')
  async indexpage(@Req() req) {
    const products = await this.ProductsService.findAll();
    const { user } = req;
    const isSeller = user && user.id && user.id.startsWith('seller_');
    const admin = user && user.id === '5pandaadmin';
    const ipAddress = process.env.IP_ADDRESS;
    console.log(ipAddress);
    return { products, user, isSeller, admin, ipAddress };
  }

  @Get('mypage')
  @UseGuards(LoggedInGuard)
  @Render('mypage')
  async myPage(@Req() req) {
    const { user } = req;
    return { user };
  }

  @Get('join')
  @Render('join')
  async joinpage(){
    return;
  }

  @Get('sellerJoin')
  @Render('sellerJoin')
  async sellerJoinpage(){
    return;
  }

  @Get('login')
  @Render('login')
  async loginpage(){
    return;
  }

  @Get('registerItem')
  @UseGuards(LoggedInGuard)
  @Render('registerItem')
  async registerItempage(@Req() req) {
    const { user } = req;
    return { user };
  }

  @Get('/init')
  async init(
    @Query('user') user: string,
    @Query('userval') userval: string,
  ): Promise<string> {
    return this.appService.init(user, userval);
  }

  @Get('/initItem')
  async initItem(
    @Query('itemName') itemName: string,
    @Query('styleNum') styleNum: string,
    @Query('brand') brand: string,
    @Query('inventory') inventory: string,
  ): Promise<string> {
    return this.appService.initItem(itemName, styleNum, brand, inventory);
  }

  @Get('/charge')
  async charge(
    @Query('user') user: string,
    @Query('userval') userval: string,
  ): Promise<string> {
    return this.appService.charge(user, userval);
  }

  @Get('/invoke')
  async invoke(
    @Query('sender') sender: string,
    @Query('reciever') reciever: string,
    @Query('value') value: string,
  ): Promise<string> {
    return this.appService.invoke(sender, reciever, value);
  }

  @Get('/purchaseItem')
  async purchaseItem(
    @Query('user') user: string,
    @Query('itemId') itemId: string,
  ): Promise<string> {
    return this.appService.purchaseItem(user, itemId);
  }

  @Get('/query')
  async query(
    @Query('name') name: string,
  ): Promise<string> {
    return this.appService.query(name);
  }

  @Get('/queryitem')
  async queryitem(
    @Query('itemId') itemId: string,
  ): Promise<string> {
    return this.appService.queryitem(itemId);
  }

  @Get('/querypurchase')
  async querypurchase(
    @Query('user') user: string,
  ): Promise<string> {
    return this.appService.querypurchase(user);
  }

  @Get('/delete')
  async delete(
    @Query('name') name: string,
  ): Promise<string> {
    return this.appService.delete(name);
  }
}